export default class Representation {
  constructor(gallery) {
    this.gallery = gallery;
  }
  init() {
    this.createRow();
  }

  addImage(path) {
    let img = document.createElement("img");
    img.classList.add("gallery__img");
    img.src = path;
    img.style.marginLeft = this.gallery.imageOffset / 2 + "px";
    img.style.marginRight = this.gallery.imageOffset / 2 + "px";
    img.style.height = `calc(100% - ${this.gallery.imageOffset}px)`;
    if (!this.currentRow.parentNode) {
      this.createRow();
    }
    this.currentRow.appendChild(img);
    this.resizeRow(this.currentRow);

    this.checkRows();
  }

  resizeRow(row) {
    if (!row) {
      return document.documentElement.clientHeight / 3 + "px";
    }
    let height = this.calculateRowHeight(row);
    row.style.height = height + "px";
    return height;
  }

  createRow() {
    let row = document.createElement("div");
    row.classList.add("gallery__row");
    this.rowImages = 0;
    this.gallery.nodes.imagesArea.appendChild(row);
    this.currentRow = row;
    row.style.height = document.documentElement.clientHeight / 3 + "px";
    return row;
  }

  calculateRowHeight(row) {
    if (!row) {
      return;
    }
    let clientWidth = this.gallery.nodes.imagesArea.clientWidth;

    let maxHeight = 0;
    row.childNodes.forEach((img) => {
      if (img.naturalHeight > maxHeight) {
        maxHeight = img.naturalHeight;
      }
    });

    let summaryWidth = 0;
    let offsetWidth = 0;
    row.childNodes.forEach((img) => {
      summaryWidth += (maxHeight / img.naturalHeight) * img.naturalWidth;
      offsetWidth += this.gallery.imageOffset;
    });

    let resultHeight = ((clientWidth - offsetWidth) / summaryWidth) * maxHeight + this.gallery.imageOffset;
    return resultHeight;
  }

  resizeRows() {
    this.gallery.nodes.imagesArea.childNodes.forEach((row) => {
      this.resizeRow(row);
    });

    this.checkRows();
  }

  checkRows() {
    let row = this.gallery.nodes.imagesArea.childNodes[0];
    let shifts = 0;
    while (row) {
      while (this.manageShift(row)) {
        shifts++;
        this.manageShift(row);
      }
      row = row.nextElementSibling;
    }

    if (shifts > 0) {
      this.checkRows();
    }
  }

  checkPrettyImg(img, height) {
    let frameWidth = document.documentElement.clientWidth;
    if (frameWidth > parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).maxWidth)) {
      frameWidth = parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).maxWidth);
    }

    if (frameWidth < parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).minWidth)) {
      frameWidth = parseInt(window.getComputedStyle(this.gallery.nodes.imagesArea).minWidth);
    }

    let space = document.documentElement.clientHeight * frameWidth;

    const part = 1 / 12;
    let alpha = (height * height * img.naturalWidth) / img.naturalHeight / space / part;

    const epsilon = 0.2;
    let flag;
    if ((alpha >= 1 - epsilon) & (alpha <= 1 + epsilon)) {
      flag = true;
    } else {
      flag = false;
    }

    let value = 0;
    if (flag == false && alpha < 1) {
      value = -1;
    }

    if (flag == false && alpha > 1) {
      value = 1;
    }

    return value;
  }

  checkPrettyRow(row) {
    if (!row) {
      return 0;
    }
    let height = parseFloat(row.style.height);
    let sum = 0;
    row.childNodes.forEach((img) => {
      sum += this.checkPrettyImg(img, height);
    });
    return sum;
  }

  manageShift(row) {
    if (!row || row.childNodes.length == 0) {
      return;
    }
    this.resizeRow(row);
    let mainIndex = this.checkPrettyRow(row);

    if (!row.nextElementSibling && row.childNodes > 1) {
      createdRow = this.createRow();
    }
    let shifted = false;
    if (mainIndex >= 3 && row.nextElementSibling !== null && row.nextElementSibling.childNodes.length > 1) {
      this.shiftImgDown(row);
      this.resizeRow(row);
      shifted = true;
    }

    if (mainIndex >= 1 && mainIndex <= 3 && row.nextElementSibling && row.nextElementSibling.nextElementSibling !== null && row.nextElementSibling.nextElementSibling.childNodes.length > 1) {
      let little = false;
      row.childNodes.forEach((img) => {
        if (img.little == this.gallery.nodes.imagesArea.clientWidth) {
          little = true;
        }
      });
      if (little != true) {
        this.shiftImgDown(row);
        this.resizeRow(row);
        shifted = true;
      }
    }

    if (mainIndex <= -3) {
      row.childNodes.forEach((img) => {
        img.little = this.gallery.nodes.imagesArea.clientWidth;
      });
      this.shiftImgDown(row);
      this.resizeRow(row);
      shifted = true;
    }

    if (row.childNodes.length == 0 && row.parentNode) {
      row.parentNode.removeChild(row);
    }

    return shifted;
  }

  shiftImgDown(row) {
    let img = row.lastChild;
    row.removeChild(img);

    if (!row.nextElementSibling) {
      this.createRow();
    }

    if (row.nextElementSibling.firstChild) {
      row.nextElementSibling.insertBefore(img, row.nextElementSibling.firstChild);
    } else {
      row.nextElementSibling.appendChild(img);
    }

    row.nextElementSibling.childNodes.forEach((img) => {
      img.little = false;
    });

    if (row.childNodes.length == 0) {
      row.parentNode.removeChild(row);
    }
  }

  deleteSelected() {
    this.gallery.nodes.imagesArea.querySelectorAll("img").forEach((img) => {
      if (img.classList.contains("gallery__img_delete")) {
        if (img.parentNode.childNodes.length == 1) {
          img.parentNode.parentNode.removeChild(img.parentNode);
        } else {
          img.parentNode.childNodes.forEach((img) => {
            img.little = false;
          });
          img.parentNode.removeChild(img);
        }
      }
    });

    this.checkRows();
  }
}
