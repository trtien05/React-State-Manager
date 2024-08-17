import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';

interface IBlog {
    title: string,
    author: string,
    content: string
}

const BlogCreateModal = (props: any) => {
    const { isOpenCreateModal, setIsOpenCreateModal } = props;
    const queryClient = useQueryClient()

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const mutation = useMutation({
        mutationFn: async (payload: IBlog) => {
            const response = await fetch(`http://localhost:8000/blogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchBlog'] })
            setAuthor('');
            setContent('')
            setTitle('')
            setIsOpenCreateModal(false)
        },
    })

    const handleSubmit = () => {
        if (!title) {
            alert("title empty");
            return;
        }
        if (!author) {
            alert("author empty");
            return;
        }
        if (!content) {
            alert("content empty");
            return;
        }
        //call api => call redux
        mutation.mutate({ title, author, content })
    }

    return (
        <>
            <Modal
                show={isOpenCreateModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop={false}
                onHide={() => setIsOpenCreateModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add A New Blog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Author"
                        className="mb-3"
                    >
                        <Form.Control
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Content">
                        <Form.Control
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    {!mutation.isPending ? (
                        <>
                            <Button
                                variant='warning'
                                onClick={() => setIsOpenCreateModal(false)} className='mr-2'>Cancel</Button>
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
        </>
    )
}

export default BlogCreateModal;