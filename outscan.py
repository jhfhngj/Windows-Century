import os

for root, _, files in os.walk("."):
    for file in files:
        path = os.path.join(root, file)
        try:
            with open(path, "rb") as f:
                content = f.read().decode(errors="ignore")
                if "http://" in content or "https://" in content:
                    print(root, file)
        except Exception:
            pass
