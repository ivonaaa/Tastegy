import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const userEmail = user ? user.email : null; 

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                const json = await response.json();

                if (response.ok) {
                    setRecipe(json);
                } else {
                    throw new Error(json.error || 'Failed to fetch recipe');
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}/comments`);
                const json = await response.json();

                if (response.ok) {
                    setComments(json);
                } else {
                    throw new Error(json.error || 'Failed to fetch comments');
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [id]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        try {
            const response = await fetch(`/api/userRecipes/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ user_id: user.id, comment: newComment }),
            });
            const json = await response.json();

            if (response.ok) {
                setComments([...comments, json]);
                setNewComment('');
            } else {
                throw new Error(json.error || 'Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="recipe-details-page">
            {recipe ? (
                <div>
                    <h1>{recipe.title}</h1>
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <h2>How to guide: </h2>
                    <p>{recipe.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div>
                {user && (
                    <div className='addComment'>
                        <p>Add a comment:</p>
                        <form onSubmit={handleSubmitComment}>
                            <textarea
                                id="new-comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                required
                            />
                            <button type="submit"><span className="material-symbols-outlined">send</span></button>
                        </form>
                    </div>
                )}
                <h2>Comments:</h2>
                <div className="comment-view">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p><small>{comment.user_id.email || userEmail}</small></p>
                            <p>{comment.comment}</p>
                            <p><small>{ formatDistanceToNow(new Date(comment.createdAt), {addSuffix: TextTrackCue}) }</small></p>
                        </div>
                    ))}
                </div> 
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
