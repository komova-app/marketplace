"""Package static MCP guides without importing the API or its dependencies."""

import argparse
import ast
from pathlib import Path


GUIDES = {
    "GETTING_STARTED": "getting-started",
    "ITEMS_AND_ENTRIES": "items-and-entries",
    "FEEDBACK_AND_HANDOFFS": "feedback-and-handoffs",
    "CHANGE_EVENTS": "change-events",
}
MARKETPLACE = Path(__file__).resolve().parents[1]
DESTINATION = MARKETPLACE / "plugins/komova/skills/komova-work/references/guides"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--api-source", type=Path,
        default=MARKETPLACE.parent / "api/app/mcp_guides.py",
        help="Maintainer source file; installed plugins need no API checkout.",
    )
    parser.add_argument("--check", action="store_true", help="Fail when bundled guides are missing or stale.")
    args = parser.parse_args()
    module = ast.parse(args.api_source.read_text(encoding="utf-8"))
    contents = {}
    for statement in module.body:
        if not isinstance(statement, ast.Assign):
            continue
        for target in statement.targets:
            if isinstance(target, ast.Name) and target.id in GUIDES:
                value = ast.literal_eval(statement.value)
                if not isinstance(value, str):
                    raise ValueError(f"{target.id} must be a static string")
                contents[GUIDES[target.id]] = value.strip() + "\n"
    if set(contents) != set(GUIDES.values()):
        raise ValueError("The API must provide all four static guide bodies")

    stale = []
    for name, content in contents.items():
        destination = DESTINATION / f"{name}.md"
        if args.check:
            if not destination.exists() or destination.read_text(encoding="utf-8") != content:
                stale.append(name)
        else:
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(content, encoding="utf-8")
    if stale:
        print("Bundled guides are missing or stale: " + ", ".join(stale))
        return 1
    print("Four bundled MCP guides match the API source." if args.check else "Packaged four MCP guides.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
