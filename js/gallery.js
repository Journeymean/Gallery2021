import UI from "./UI";
import ImageLoader from "./ImageLoader";
import Representation from "./Representation";
import "./../less/gallery.less";

export default class Gallery {
  constructor() {
    this.ui = new UI(this);
    this.imageLoader = new ImageLoader(this);
    this.representation = new Representation(this);
    window.onload = () => {
      this.init();
    };

    this.imageOffset = 5;
  }

  init() {
    this.nodes = new Object();
    this.nodes.gallery = document.querySelector(".gallery");
    this.nodes.panel = this.nodes.gallery.querySelector(".gallery__panel");
    this.nodes.fileInput = this.nodes.panel.querySelector(".gallery__file-input");
    this.nodes.uploadFile = this.nodes.panel.querySelector(".gallery__upload-file");
    this.nodes.deleteButton = this.nodes.panel.querySelector(".gallery__delete-button");
    this.nodes.drop = this.nodes.gallery.querySelector(".gallery__drop");
    this.nodes.imagesArea = this.nodes.gallery.querySelector(".gallery__images-area");
    this.nodes.statusBar = this.nodes.gallery.querySelector(".gallery__status-bar");
    this.nodes.errorPanel = this.nodes.gallery.querySelector(".gallery__error-panel");
    this.nodes.deletePanel = this.nodes.gallery.querySelector(".gallery__delete-panel");
    this.nodes.deleteSelected = this.nodes.gallery.querySelector(".gallery__delete-selected");
    this.nodes.deleteCancel = this.nodes.gallery.querySelector(".gallery__delete-cancel");

    this.ui.init();
    this.imageLoader.init();
    this.representation.init();
  }
}
