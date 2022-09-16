// import React, { useState } from 'react';

// import classNames from 'classnames';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';


// const AnnoInfoModal = ({ annotations, setAnnotations,  }) => {
//     const [show, setShow] = useState(false);
//     const [inputs, setInputs] = useState({
//         areaName: '',
//         areaDesc: '',
//         title: '',
//         titleContent: '',
//         wordCount: '',
//         isOneLine: '',
//         isEng: '',
//     });

//     const handleTextChange = (event) => {
//         const name = event.target.id;
//         const value = event.target.value;
//         console.log(name, value, event.target)
//         setInputs(values => ({ ...values, [name]: value }))
//     }

//     const handleClose = () => {
//         setNewAnnotation([]);
//         //alert(JSON.stringify(newAnnotation));
//         setShow(false);
//         setInputs({
//             areaName: '',
//             areaDesc: '',
//             title: '',
//             titleContent: '',
//             wordCount: '',
//             isOneLine: '',
//             isEng: '',
//         })
//     };

//     const handleCheck = (e) => {
//         e.preventDefault()
//         let submitData = inputs;
//         if (submitData.areaName === '') {
//             alert(`未填寫區域名稱`);
//             return;
//         }
//         if (submitData.areaDesc === '') {
//             alert(`未填寫區域說明`);
//             return;
//         }
//         if (submitData.title === '') {
//             alert(`未填寫標籤欄位`);
//             return;
//         }
//         if (submitData.titleContent === '') {
//             alert(`未填寫標籤內容`);
//             return;
//         }
//         newAnnotation[0].areaName = submitData.areaName;
//         newAnnotation[0].areaDesc = submitData.areaDesc;
//         newAnnotation[0].title = submitData.title;
//         newAnnotation[0].titleContent = submitData.titleContent;
//         newAnnotation[0].wordCount = submitData.wordCount;
//         newAnnotation[0].isOneLine = submitData.isOneLine == "on" ? "Y" : "N";
//         newAnnotation[0].isEng = submitData.isEng == "on" ? "Y" : "N";
//         alert(JSON.stringify(newAnnotation));
//         annotations.push(...newAnnotation);
//         setAnnotations(annotations);
//         setNewAnnotation([]);
//         setShow(false);
//         setInputs({
//             areaName: '',
//             areaDesc: '',
//             title: '',
//             titleContent: '',
//             wordCount: '',
//             isOneLine: '',
//             isEng: '',
//         })
//     }
//     return (
//             <Modal show={show} onHide={handleClose} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>新增標註</Modal.Title>
//                 </Modal.Header>
//                 <Form onSubmit={handleCheck}>
//                     <Modal.Body>
//                         <FloatingLabel
//                             controlId="areaName"
//                             label="區域名稱*"
//                             className="mb-3"
//                             onChange={handleTextChange}>
//                             <Form.Control type="text" placeholder="type areaName" />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             controlId="areaDesc"
//                             label="區域說明*"
//                             className="mb-3"
//                             onChange={handleTextChange}>
//                             <Form.Control type="text" placeholder="type areaDesc" />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             controlId="title"
//                             label="標籤名稱*"
//                             className="mb-3"
//                             onChange={handleTextChange}>
//                             <Form.Control type="text" placeholder="type title" />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             controlId="titleContent"
//                             label="標籤內容*"
//                             className="mb-3"
//                             onChange={handleTextChange}>
//                             <Form.Control type="text" placeholder="type titleContent" />
//                         </FloatingLabel>
//                         <FloatingLabel
//                             controlId="wordCount"
//                             label="字數"
//                             className="mb-3"
//                             onChange={handleTextChange}>
//                             <Form.Control type="text" placeholder="type wordCount" />
//                         </FloatingLabel>
//                         <Form.Group className="mb-3">
//                             <Form.Check
//                                 id="isOneLine"
//                                 label="是否為單行"
//                                 onChange={handleTextChange}
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Check
//                                 id="isEng"
//                                 label="是否為英數字"
//                                 onChange={handleTextChange}
//                             />
//                         </Form.Group>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             取消
//                         </Button>
//                         <Button variant="primary" type="submit">
//                             儲存
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>
//     )
// }

// export default AnnoInfoModal;