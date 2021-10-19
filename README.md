# How do I use it?
Pretty straight forward, you include the reader class from this library.
Create an instance with the path to the `.img` archive you wish to read.

When you're ready, call the `read()` method to read its file list into memory.
This is supplied as a promise even though it's an async action.

When you want to read file call `readFile(filename)` where `filename` is a file within the archive such as "beer_girla.dff".
The raw data is returned as a buffer which you can manipulate as you wish.

# Does it hog RAM?
It doesn't, only the file list is kept in memory. Raw file data is read off disk on demand when you try and access it.

A possible performance improvement would be to read the file in chunks without reading the whole file into memory.
It may speed up larger archive formats.

# Code sample, please!
```
const reader = new IMGReader(path.join(__dirname, "..", "cutscene.img"));
reader.read()
.then(() => {
    console.log("Read archive into memory.");
    const entry = reader.readFile("beer_girla.dff");
    fs.writeFileSync("beer_girla.dff", entry);
});
```

# Typescript?
Yeah, it's in typescript. Typings are included.

# Pull Requests?
Sure, if theres a bug and you have the fix or would like to add a feature open a PR.
Please keep it to IMG file manipulation only!

I'm definitely open to someone putting the effort in to write files into `.img` archives.
But as its currently outside of my usecase I've not bothered.