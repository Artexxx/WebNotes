<h1> <img src="res/images/downgit.png" width="20" height=auto /> DownGit </h1>

#### Create GitHub Resource Download Link

With this tool you can directly download or create download link to any GitHub **public directory or file**.

##### Advanced Usage

A typical download URL will look like this- `https://artexxx.github.io/DownGit/#/home?url=<link>&fileName=<name>&rootDirectory=<true or false or name>`

Now, if you want to download this directory- **`https://github.com/Artexxx/Artem-python/tree/master/УЧЕБНИК`**
 with this file name- **`DownGit-BOOK.zip`** and this root directory name- **`Python-Book`**,
 then the URL will be- https://artexxx.github.io/DownGit/#/home?url=https://github.com/Artexxx/Artem-python/tree/master/УЧЕБНИК&fileName=DownGit-BOOK&rootDirectory=Python-Book
 https://artexxx.github.io/DownGit/#/home?url=https://github.com/Artexxx/Artem-python/tree/master/УЧЕБНИК&fileName=DownGit-Images&rootDirectory=ImagesOfDownGit

In default, value of `fileName` and `rootDirectory` is set to the name of the downloading file or directory. If you do not want to add the directory itself in the zip, then set `rootDirectory=false`. 
Like: this link- https://artexxx.github.io/DownGit/#/home?url=https://github.com/Artexxx/Artem-python/tree/master/УЧЕБНИК&rootDirectory=false will download a file named **`УЧЕБНИК.zip`**; however the root directory- `"УЧЕБНИК"`, will not be included in the zip.

If you want to download file-
 **`https://github.com/Artexxx/Artem-python/blob/master/УЧЕБНИК/посторонние_модули.py`** with name- **`DownGitFile.zip`**, then the link will be-
  https://artexxx.github.io/DownGit/#/home?url=https://github.com/Artexxx/Artem-python/blob/master/УЧЕБНИК/посторонние_модули.py&fileName=DownGitFile
