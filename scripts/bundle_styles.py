"""Combine existing CSS in its original cascade order; no third-party dependencies."""
import argparse
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
SOURCES = (
    'styles.css', 'theme.css', 'results.css', 'brand.css', 'motion.css',
    'vendor/lenis-1.3.26/lenis.css', 'typography.css', 'sections.css', 'services-images.css',
)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify the bundle without changing files.')
    args = parser.parse_args()
    parts = []
    for source in SOURCES:
        css = (DIST / source).read_text(encoding='utf-8')
        if re.search(r'@(?:import|charset)\b', css):
            raise SystemExit(f'Unsupported stylesheet directive in {source}; review before bundling.')
        # Only the Lenis stylesheet changes base directory; it has no relative assets.
        if '/' in source and re.search(r'url\(', css):
            raise SystemExit(f'Relative asset path in {source}; review before bundling.')
        parts.append(f'/* Source: {source} */\n{css.rstrip()}\n')
    bundled = '\n'.join(parts)
    name = 'site-' + hashlib.sha256(bundled.encode('utf-8')).hexdigest()[:12] + '.css'
    index = DIST / 'index.html'
    html = index.read_text(encoding='utf-8')
    links = re.findall(r'<link rel="stylesheet" href="([^"]+)">', html)
    if args.check:
        if links != [name] or not (DIST / name).is_file() or (DIST / name).read_text(encoding='utf-8') != bundled:
            raise SystemExit('Styles are out of date. Run: python scripts/bundle_styles.py')
    else:
        if links == list(SOURCES):
            first = True
            def replace(match):
                nonlocal first
                if first:
                    first = False
                    return f'<link rel="stylesheet" href="{name}">'
                return ''
            html = re.sub(r'<link rel="stylesheet" href="[^"]+">', replace, html)
        elif len(links) == 1 and re.fullmatch(r'site-[a-f0-9]{12}\.css', links[0]):
            html = html.replace(f'href="{links[0]}"', f'href="{name}"')
        else:
            raise SystemExit('Unexpected stylesheet order; review before bundling.')
        head, body = html.split('<body>', 1)
        html = re.sub(r'(?m)^[ \t]+\n', '', head) + '<body>' + body
        (DIST / name).write_text(bundled, encoding='utf-8')
        index.write_text(html, encoding='utf-8')
    print(f'{name}: {len(SOURCES)} stylesheets combined, {len(bundled.encode("utf-8"))} bytes, original rules preserved.')

if __name__ == '__main__':
    main()
