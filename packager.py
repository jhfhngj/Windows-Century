print("Packager for Century Packages")
with open(input("Filename? ")+".json","w") as f:
    installto = input("Install to? ")
    content = input("Content? (If the content is binary just base64 encode it) ")
    result = "{ 'installTo':'"+installto+"','contents':'"+content+"' }"
    f.write(result)