import { Component } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

class EditPost extends Component {

    constructor(props) {
        super(props);
        const post = this.props.state.state.post;
        this.state = {
            id: post.id, title: post.title, desc: post.desc
        };
    }

    updatePost(e) {
        e.preventDefault();
        this.props.updatePost(this.state);
        this.props.navigate("/");
    }
    render() {
        return (
            <div className="card bg-black  px-5">
                <form onSubmit={this.updatePost.bind(this)}>
                    <h3 className="text-center text-white mt-3">Update Post</h3>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label text-white">Post Title</label>
                        <input type="text" className="form-control rounded-0" id="title"
                            onChange={e => this.setState({ title: e.target.value })} value={this.state.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label text-white">Post Description</label>
                        <input type="text" className="form-control rounded-0 " id="desc"
                            onChange={e => this.setState({ desc: e.target.value })} value={this.state.desc} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm mb-3 float-end ">Update</button>
                </form>
            </div>
        );
    }
}

export default (props) => {
    let navigate = useNavigate();
    let state = useLocation();
    return <EditPost {...props} navigate={navigate} state={state}></EditPost>
};