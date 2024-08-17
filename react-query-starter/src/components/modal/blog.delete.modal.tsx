import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

interface IBlog {
    id: number
}
const BlogDeleteModal = (props: any) => {
    const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (payload: IBlog) => {
            const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchBlog'] })
            setIsOpenDeleteModal(false)
        },
    })
    const handleSubmit = () => {
        if (dataBlog?.id) {
            mutation.mutate({ id: dataBlog?.id })
        }

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
                    Delete A Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the blog: {dataBlog?.title ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {!mutation.isPending ? (
                    <>
                        <Button
                            variant='warning'
                            onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Save</Button>
                    </>

                ) : (
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
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default BlogDeleteModal;