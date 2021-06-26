export default class ImageLoader {
  constructor(gallery) {
    this.gallery = gallery;
  }
  init() {
    this.images = new Map();
  }

  loadRemote(path) {
    let request = new XMLHttpRequest();
    request.open("GET", path, true);
    try {
      request.send();
    } catch (e) {
      this.gallery.ui.displayError("Неправильный адрес URL");
    }

    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        this.parseResponse(request.responseURL, request.responseText);
      }
    };
  }

  loadFromFile() {
    let reader = new FileReader();
    let url, text;

    reader.readAsText(this.gallery.nodes.uploadFile.files[0]);
    reader.onload = (event) => {
      text = event.target.result;
      if (text && url) {
        this.parseResponse(url, text);
      }
    };

    let reader2 = new FileReader();
    reader2.readAsDataURL(this.gallery.nodes.uploadFile.files[0]);
    reader2.onload = (event) => {
      url = event.target.result;
      if (text && url) {
        this.parseResponse(url, text);
      }
    };
  }

  parseResponse(responseURL, responseText) {
    let img = document.createElement("img");
    img.src = responseURL;

    img.onload = () => {
      this.loadFromUrl(responseURL, false);
    };

    img.onerror = () => {
      this.loadFromJson(responseText);
    };
  }

  loadFromUrl(url, err = true) {
    var img = new Image();
    img.src = url;
    this.gallery.ui.addImageToLoadList(img);
    img.onload = () => {
      this.gallery.representation.addImage(url);
      this.gallery.ui.removeImageFromLoadList(img);
    };
    if (err) {
      img.onerror = () => {
        this.gallery.ui.displayError("Неверный формат файла");
      };
    }
  }

  loadFromJson(text) {
    let images;
    try {
      images = JSON.parse(text);
      images.galleryImages.forEach((image) => {
        this.loadFromUrl(image.url);
      });
    } catch (e) {
      this.gallery.ui.displayError("Неверный формат файла");
    }
  }
}
