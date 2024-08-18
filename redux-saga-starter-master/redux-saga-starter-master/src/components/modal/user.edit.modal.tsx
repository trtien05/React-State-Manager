import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { editUserPending } from '../../redux/users/user.slide';
import Spinner from 'react-bootstrap/Spinner';

const UserEditModal = (props: any) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
    const [id, setId] = useState();

    const dispatch = useAppDispatch();
    const isEditing = useAppSelector(state => state.users.isEditing);
    const isEditSuccess = useAppSelector(state => state.users.isEditSuccess);

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (dataUser?.id) {
            setId(dataUser?.id);
            setEmail(dataUser?.email);
            setName(dataUser?.name)
        }
    }, [dataUser])

    useEffect(() => {
        if (isEditSuccess) {
            setIsOpenUpdateModal(false)
        }
    }, [isEditSuccess])

    const handleSubmit = () => {
        if (!email) {
            alert("email empty");
            return;
        }
        if (!name) {
            alert("name empty");
            return;
        }
        if (id) {
            dispatch(editUserPending({ email, name, id }))
        }
    }

    return (
        <>
            <Modal
                show={isOpenUpdateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => setIsOpenUpdateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update A User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Name">
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    {isEditing === false ? (
                        <>
                            <Button
                                variant='warning'
                                onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>Cancel</Button>
                            <Button onClick={() => handleSubmit()}>Confirm</Button>

                        </>) : (
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserEditModal;