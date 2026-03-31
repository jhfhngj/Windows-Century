print("Packager for Century Packages")
if True:
    installto = input("Install to? ")
    content = input("Content? (If the content is binary just base64 encode it) ")
    result = "{ 'installTo':'"+installto+"','contents':'"+content+"' }"
    print(result)