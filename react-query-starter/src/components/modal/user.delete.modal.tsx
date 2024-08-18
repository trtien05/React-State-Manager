import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { QUERY_KEY } from '../../config/key';

interface IUser {
    id: number,
    name: string,
    email: string
}

const UserDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: IUser) => {
            const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response.json();
        },
        //if success
        onSuccess: (data, variables, context) => {
            toast('wow so easy! Delete succeed');
            setIsOpenDeleteModal(false);
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllUser() })

        },
    })
    const handleSubmit = () => {
        mutation.mutate(dataUser)

    }

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {!mutation.isPending ? (
                    <>
                        <Button
                            variant='warning'
                            onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Confirm</Button>
                    </>
                ) : (
                    <>
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <></> Saving...
                        </Button>
                    </>
                )}

            </Modal.Footer>
        </Modal>
    )
}

export default UserDeleteModal;