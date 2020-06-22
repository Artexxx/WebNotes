document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave","dragend"].forEach(type=>{
    dropZoneElement.addEventListener(type,e=>{
        dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop",e=>{
      e.preventDefault();

      if(e.dataTransfer.files.length){
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement,e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
  })

  dropZoneElement.addEventListener("click",(e)=>{
      inputElement.click();
  })

  inputElement.addEventListener("change",e=>{

    if(inputElement.files.length){
        updateThumbnail(dropZoneElement,inputElement.files[0]);
    }

  });

});

function updateThumbnail(dropZoneEle,file){
    let thumbnailEle = dropZoneEle.querySelector(".drop-zone__thumb");

    if(document.querySelector(".drop-zone__message")){
        document.querySelector(".drop-zone__message").remove();
    }

    if(!thumbnailEle){
        thumbnailEle = document.createElement("div");
        thumbnailEle.classList.add("drop-zone__thumb");
        dropZoneEle.appendChild(thumbnailEle);
    }

    thumbnailEle.dataset.label = file.name;
    if(file.type.startsWith("image/")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
            thumbnailEle.style.backgroundImage = `url(${reader.result})`;
        }
    } else{
        thumbnailEle.style.backgroundImage=null;
    }
}