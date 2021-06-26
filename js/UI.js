export default class UI {
  constructor(gallery) {
    this.gallery = gallery;
  }
  init() {
    this.deleteMode = false;

    this.gallery.nodes.fileInput.addEventListener("change", () => {
      this.gallery.imageLoader.loadRemote(this.gallery.nodes.fileInput.value);
    });

    this.resizeObserve();

    this.gallery.nodes.uploadFile.addEventListener("change", () => {
      this.gallery.imageLoader.loadFromFile();
    });

    this.gallery.nodes.deleteButton.addEventListener("click", () => {
      this.enableDeleteMode();
    });
    this.gallery.nodes.deleteCancel.addEventListener("click", () => {
      this.disableDeleteMode();
    });

    this.gallery.nodes.deleteSelected.addEventListener("click", () => {
      this.gallery.representation.deleteSelected();
      this.disableDeleteMode();
    });

    this.initDrag();

    this.loadList = {};
    this.loadList.wait = [];
    this.loadList.total = [];
  }

  resizeObserve() {
    window.addEventListener("resize", () => {
      this.gallery.representation.resizeRows();
    });
  }

  enableDeleteMode() {
    this.gallery.nodes.imagesArea.querySelectorAll("img").forEach((img) => {
      img.addEventListener("click", this.markImgToDelete);
    });

    this.gallery.nodes.deletePanel.classList.remove("hide");
  }

  disableDeleteMode() {
    this.gallery.nodes.imagesArea.querySelectorAll("img").forEach((img) => {
      img.classList.remove("gallery__img_delete");
      img.removeEventListener("click", this.markImgToDelete);
    });

    this.gallery.nodes.deletePanel.classList.add("hide");
  }

  markImgToDelete(event) {
    event.target.classList.add("gallery__img_delete");
  }

  initDrag() {
    let dropArea = this.gallery.nodes.imagesArea;
    let dropInitial = this.gallery.nodes.drop;
    let dragOver = (event) => {
      event.dataTransfer.dropEffect = "move";
      event.returnValue = false;
      return;
    };

    let dropImage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let files = e.dataTransfer.files;

      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.type.indexOf("image") == 0) {
          let reader = new FileReader();
          reader.onload = (e) => {
            let url = e.target.result;
            this.gallery.imageLoader.loadFromUrl(url);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    dropArea.addEventListener("drop", dropImage, false);
    dropArea.addEventListener("dragover", dragOver, false);

    dropInitial.addEventListener("drop", (event) => {
      dropImage(event);
      dropInitial.classList.remove("drop");
    });
    dropInitial.addEventListener("dragover", dragOver, false);
    dropInitial.addEventListener("dragenter", () => {
      dropInitial.classList.add("drop");
    });

    dropInitial.addEventListener("dragleave", () => {
      dropInitial.classList.remove("drop");
    });
  }

  addImageToLoadList(img) {
    this.loadList.wait.push(img);
    this.loadList.total.push(img);
    this.printStatus("load");
  }

  removeImageFromLoadList(img) {
    this.loadList.wait.splice(this.loadList.wait.indexOf(img), 1);
    this.printStatus("load");
  }

  printStatus(status) {
    if (status == "load") {
      let total = this.loadList.total.length;
      let current = total - this.loadList.wait.length;
      if (total !== current) {
        this.gallery.nodes.statusBar.classList.remove("hide");
      } else {
        this.gallery.nodes.statusBar.classList.add("hide");
      }
      let loader = '<svg class="gallery__loader" viewBox="0 0 38 38" stroke="#fff"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>';
      this.gallery.nodes.statusBar.innerHTML = `<div class="gallery__status-text">Загрузка изображений...</div><div class="gallery__status-count">${current}  /  ${total} </div> ${loader}`;
    }
  }

  displayError(err) {
    let errorNode = this.gallery.nodes.errorPanel;
    errorNode.classList.remove("hide");
    errorNode.innerText = err;
    setTimeout(() => {
      errorNode.classList.add("hide");
    }, 5000);
  }
}
