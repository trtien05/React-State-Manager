import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';

interface IBlog {
    id: number,
    title: string,
    author: string,
    content: string
}

const BlogEditModal = (props: any) => {
    const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;
    const [id, setId] = useState();
    const queryClient = useQueryClient()

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (dataBlog?.id) {
            setId(dataBlog?.id);
            setTitle(dataBlog?.title);
            setAuthor(dataBlog?.author);
            setContent(dataBlog?.content);
        }
    }, [dataBlog])

    const mutation = useMutation({
        mutationFn: async (payload: IBlog) => {
            const response = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
                method: 'PUT',
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
            setIsOpenUpdateModal(false)
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
        if (id) {
            mutation.mutate({ id, title, content, author })

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
                        Update A Blog
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
                                onClick={() => setIsOpenUpdateModal(false)} className='mr-2'>Cancel</Button>
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

export default BlogEditModal;