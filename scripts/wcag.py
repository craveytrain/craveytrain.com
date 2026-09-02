#!/usr/bin/env python3
"""wcag.py: validate WCAG contrast ratios for the Affiche token system.

Parses the :root block of static/css/main.css for:
  - Layer 1 pigments:  --name: oklch(L% C Hdeg);
  - Layer 2 roles:     --role: light-dark(var(--a), var(--b));
  - Direct aliases:    --role: var(--pigment);   (same pigment both modes)

Converts oklch -> OKLab -> LMS -> linear sRGB -> WCAG relative luminance,
then computes the contrast ratio (L1 + 0.05) / (L2 + 0.05) for a fixed set
of role pairs, in both the jour (light) and nuit (dark) resolutions.

Usage:
    python3 scripts/wcag.py               # validate static/css/main.css
    python3 scripts/wcag.py --self-test    # validate the reference palette

Exit status: 0 if every pair passes its minimum, 1 otherwise (including
the case where required tokens are not found in the CSS, that's expected
before Phase 1 lands the new :root block).
"""

import math
import re
import sys
from pathlib import Path

CSS_PATH = Path(__file__).resolve().parent.parent / "static" / "css" / "main.css"

# A reference token block used by --self-test to validate the math
# independently of main.css.
SELF_TEST_CSS = """
:root {
	color-scheme: light dark;

	/* -- Layer 1: palette -- fixed pigments, never referenced by components -- */
	--cream: oklch(93% 0.025 85deg);
	--cream-bright: oklch(92% 0.03 85deg);
	--cream-deep: oklch(89% 0.035 85deg);
	--cream-dim: oklch(79% 0.04 85deg);
	--midnight: oklch(30% 0.075 265deg);
	--midnight-light: oklch(44% 0.06 265deg);
	--midnight-lifted: oklch(31% 0.065 265deg);
	--midnight-deep: oklch(26% 0.06 265deg);
	--red: oklch(48.5% 0.185 30deg);
	--red-bright: oklch(66% 0.17 30deg);
	--gold: oklch(78% 0.12 85deg);
	--gold-bright: oklch(82% 0.11 85deg);
	--teal: oklch(58% 0.08 200deg);
	--teal-bright: oklch(63% 0.07 200deg);
	--red-light: oklch(70% 0.15 30deg);
	--teal-deep: oklch(45% 0.08 200deg);
	--teal-light: oklch(70% 0.07 200deg);

	/* -- Layer 2: semantic roles -- jour / nuit is only this remap -- */
	--surface: light-dark(var(--cream), var(--midnight-deep));
	--surface-deep: light-dark(var(--cream-deep), var(--midnight-lifted));
	--text: light-dark(var(--midnight), var(--cream-bright));
	--text-muted: light-dark(var(--midnight-light), var(--cream-dim));
	--frame: light-dark(var(--midnight), var(--cream-bright));
	--fill: light-dark(var(--midnight), var(--cream-bright));
	--on-fill: light-dark(var(--cream), var(--midnight-deep));
	--accent: light-dark(var(--red), var(--red-bright));
	--on-accent: light-dark(var(--cream), var(--midnight-deep));
	--ornament: light-dark(var(--gold), var(--gold-bright));
	--on-ornament: var(--midnight); /* never flips */
	--horizon: light-dark(var(--teal), var(--teal-bright));
	--selection-bg: light-dark(var(--red), var(--red-bright));
	--selection-fg: light-dark(var(--cream), var(--midnight-deep));
	--footer-link: light-dark(var(--gold), var(--red));
	--syntax-comment: light-dark(var(--midnight-light), var(--cream-dim));
	--syntax-punctuation: light-dark(var(--midnight-light), var(--cream-dim));
	--syntax-property: light-dark(var(--red), var(--red-light));
	--syntax-value: light-dark(var(--midnight), var(--gold-bright));
	--syntax-at-rule: light-dark(var(--teal-deep), var(--teal-light));
	--syntax-selector: light-dark(var(--midnight), var(--gold-bright));
}
"""

# (pair, minimum ratio required)
PAIRS = [
	("--text", "--surface", 7.0),
	("--text-muted", "--surface", 4.5),
	("--accent", "--surface", 4.5),
	("--on-ornament", "--ornament", 4.5),
	("--on-fill", "--fill", 4.5),
	("--footer-link", "--fill", 4.5),
	("--selection-fg", "--selection-bg", 4.5),
	("--syntax-comment", "--surface-deep", 4.5),
	("--syntax-punctuation", "--surface-deep", 4.5),
	("--syntax-property", "--surface-deep", 4.5),
	("--syntax-value", "--surface-deep", 4.5),
	("--syntax-at-rule", "--surface-deep", 4.5),
	("--syntax-selector", "--surface-deep", 4.5),
]

PIGMENT_RE = re.compile(
	r"--([\w-]+):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)deg\s*\)\s*;"
)
ROLE_RE = re.compile(
	r"--([\w-]+):\s*light-dark\(\s*var\(--([\w-]+)\)\s*,\s*var\(--([\w-]+)\)\s*\)\s*;"
)
ALIAS_RE = re.compile(r"--([\w-]+):\s*var\(--([\w-]+)\)\s*;")


def extract_root_block(css_text):
	"""Return the contents of the first :root { ... } block."""
	match = re.search(r":root\s*\{(.*?)\}", css_text, re.DOTALL)
	if not match:
		return None
	return match.group(1)


def oklch_to_linear_srgb(l_pct, c, h_deg):
	"""oklch(L% C Hdeg) -> (R, G, B) linear sRGB, clamped to [0, 1]."""
	L = l_pct / 100.0
	h_rad = math.radians(h_deg)
	a = c * math.cos(h_rad)
	b = c * math.sin(h_rad)

	l_ = L + 0.3963377774 * a + 0.2158037573 * b
	m_ = L - 0.1055613458 * a - 0.0638541728 * b
	s_ = L - 0.0894841775 * a - 1.2914855480 * b

	l = l_**3
	m = m_**3
	s = s_**3

	r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
	g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
	bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

	clamp = lambda v: max(0.0, min(1.0, v))
	return clamp(r), clamp(g), clamp(bl)


def relative_luminance(rgb):
	r, g, b = rgb
	return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(rgb1, rgb2):
	l1 = relative_luminance(rgb1)
	l2 = relative_luminance(rgb2)
	lighter, darker = (l1, l2) if l1 >= l2 else (l2, l1)
	return (lighter + 0.05) / (darker + 0.05)


def parse_tokens(root_block):
	"""Return (pigments, roles) dicts.

	pigments: name -> (R, G, B) linear sRGB
	roles: name -> (jour_pigment_name, nuit_pigment_name)
	"""
	pigments = {}
	for name, l_pct, c, h in PIGMENT_RE.findall(root_block):
		pigments[name] = oklch_to_linear_srgb(float(l_pct), float(c), float(h))

	roles = {}
	for name, jour_ref, nuit_ref in ROLE_RE.findall(root_block):
		roles[name] = (jour_ref, nuit_ref)

	# Direct aliases (e.g. --on-ornament: var(--midnight);) resolve to the
	# same pigment in both modes. Only apply if not already captured as a
	# light-dark() role.
	for name, ref in ALIAS_RE.findall(root_block):
		if name in roles:
			continue
		roles[name] = (ref, ref)

	return pigments, roles


def resolve(role_name, roles, pigments, mode_index):
	"""Resolve a role (or bare pigment) name to its linear sRGB tuple for a mode."""
	key = role_name.lstrip("-")
	if key in roles:
		pigment_name = roles[key][mode_index]
		return pigments.get(pigment_name)
	if key in pigments:
		return pigments[key]
	return None


def run(root_block, label):
	pigments, roles = parse_tokens(root_block)

	missing_roles = []
	for a, b, _min_ratio in PAIRS:
		for role in (a, b):
			key = role.lstrip("-")
			if key not in roles and key not in pigments:
				missing_roles.append(role)

	if missing_roles:
		uniq = sorted(set(missing_roles))
		print(f"[{label}] required tokens not found: {', '.join(uniq)}")
		print(
			f"[{label}] this is expected before Phase 1 lands the new :root "
			"block (old theme has no light-dark() roles yet)."
		)
		return 1

	rows = []
	all_pass = True
	for a, b, min_ratio in PAIRS:
		jour_a = resolve(a, roles, pigments, 0)
		jour_b = resolve(b, roles, pigments, 0)
		nuit_a = resolve(a, roles, pigments, 1)
		nuit_b = resolve(b, roles, pigments, 1)

		if None in (jour_a, jour_b, nuit_a, nuit_b):
			rows.append((a, b, None, None, min_ratio, False))
			all_pass = False
			continue

		jour_ratio = contrast_ratio(jour_a, jour_b)
		nuit_ratio = contrast_ratio(nuit_a, nuit_b)
		passed = jour_ratio >= min_ratio and nuit_ratio >= min_ratio
		all_pass = all_pass and passed
		rows.append((a, b, jour_ratio, nuit_ratio, min_ratio, passed))

	print_table(label, rows)
	return 0 if all_pass else 1


def print_table(label, rows):
	print(f"\n{label}")
	header = f"{'Pair':<32}{'Jour':>8}{'Nuit':>8}{'Min':>8}  Result"
	print(header)
	print("-" * len(header))
	for a, b, jour_ratio, nuit_ratio, min_ratio, passed in rows:
		pair = f"{a} on {b}"
		jour_s = f"{jour_ratio:.2f}" if jour_ratio is not None else "  n/a"
		nuit_s = f"{nuit_ratio:.2f}" if nuit_ratio is not None else "  n/a"
		result = "PASS" if passed else "FAIL"
		print(f"{pair:<32}{jour_s:>8}{nuit_s:>8}{min_ratio:>8.1f}  {result}")


def main():
	self_test = "--self-test" in sys.argv

	if self_test:
		root_block = extract_root_block(SELF_TEST_CSS)
		exit_code = run(root_block, "SELF-TEST (reference palette)")
		sys.exit(exit_code)

	if not CSS_PATH.exists():
		print(f"CSS file not found: {CSS_PATH}")
		sys.exit(1)

	css_text = CSS_PATH.read_text()
	root_block = extract_root_block(css_text)
	if root_block is None:
		print(f":root block not found in {CSS_PATH}")
		sys.exit(1)

	exit_code = run(root_block, str(CSS_PATH.relative_to(CSS_PATH.parent.parent.parent)))
	sys.exit(exit_code)


if __name__ == "__main__":
	main()
