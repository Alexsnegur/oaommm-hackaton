import { useRef, useState } from 'react'
import Select from '../select/Select'
import Btn from '../res/Btn'
import style from './style.module.css'
import UploadsFile from './UploadsFile';

function Modal({open, setOpen}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);  // Хранит выбранный файл
  const [fileName, setFileName] = useState("Добавить файл");
  const [files, setFiles] = useState([]); // Начальное значение текста кнопки
  const [data, setData] = useState([])

  function handleClose() {
    setOpen(false)
  }

  function handleClick() {
    console.log('clic click');
    setOpen(false)
  }

  function handleModal(e) {
    e.stopPropagation()
  }

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);  // Отображаем имя выбранного файла
    }

    const selectedFiles1 = Array.from(event.target.files); // Преобразуем FileList в массив
    setFiles(selectedFiles1);

    const cloneData = []
    for(let i = 0; i < selectedFiles1.length; i++) {
      console.log([...data, selectedFiles1[i].name]);
      cloneData.push(selectedFiles1[i].name)
    }
    setData(cloneData)

  };

  return (
    <div className={style.modalWrapper} onClick={handleClose}>
      <div className={style.modal} onClick={handleModal}>
        <div className={style.header}>
          <div className={style.name}>Загрузка файлов</div>
          <div className={style.close} onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </div>
        </div>
        <div className={style.body}>
          <Select name='Свои' options={['Общие', 'Свои']} />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            multiple
          />
          <div className={style.uploadContainer}>
            <div className={style.uploadButton} onClick={handleIconClick}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="#a9f0ff" />
                <path d="M12 7v10M7 12h10" stroke="black" strokeWidth="2" />
              </svg>
              <span>{fileName}</span>
            </div>
          </div>
          {
            selectedFile ?
              <UploadsFile data={data} setData={setData} />
              :
              <></>
          }

          <Btn handleClick={handleClick} />
        </div>
      </div>
    </div>
  )
}

export default Modal
