import keyword,builtins

with open("highlight.txt","w") as f:
    f.write("\n".join(keyword.kwlist)+"\n".join(dir(builtins)))
with open("highlight.re","w") as f:
    f.write("("+"|".join(keyword.kwlist)+"|".join(dir(builtins))+")")