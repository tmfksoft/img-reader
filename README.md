# How do I use it?
Pretty straight forward, you include the reader class from this library.
Create an instance the raw data from the IMG file you wish to read.

It's up to you to acquire a Buffer containing the raw IMG data.

The IMG reader will automatically parse the data and read the directory list.
Only "VER2" IMG archives are supported!

When you want to read file call `readFile(filename)` where `filename` is a file within the archive such as "beer_girla.dff".
The raw data is returned as a buffer which you can manipulate as you wish.

# Does it hog RAM?
Yes, the raw data is kept in memory along with the file list.

This is due to the readers intention of being able to read the data into memory once for future manipulation such as in environments where streaming a file off disk
isn't possible, such as in the browser.

A streaming variation may be the next stage.

# Code sample, please!
```
const rawData = fs.readFileSync(path.join(__dirname, "..", "cutscene.img"));
const reader = new IMGReader(rawData);

console.log("Read archive into memory.");
const entry = reader.readFile("beer_girla.dff");
fs.writeFileSync("beer_girla.dff", entry);

```

# Typescript?
Yup, it's in typescript. Typings are included.

# Pull Requests?
Sure, if theres a bug and you have the fix or would like to add a feature open a PR.
Please keep it to IMG file manipulation only!

I'm definitely open to someone putting the effort in to write files into `.img` archives.
But as its currently outside of my usecase I've not bothered.