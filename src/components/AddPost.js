import { Component } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

class AddPost extends Component {
    state = {
        title: "",
        desc: "",
    }

    addUser = (event) => {
        event.preventDefault();
        this.props.addPost({ id: uuid(), ...this.state })
        this.setState({
            title: "", desc: ""
        });
        this.props.navigate("/");
    }
    render() {
        // const { navigate } = this.props;
        return (
            <div className="card bg-black  px-5">
                <form onSubmit={this.addUser}>
                    <h3 className="text-center text-white mt-3">Add new Post</h3>
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
                    <button type="submit" className="btn btn-primary btn-sm mb-3 float-end ">Add</button>
                </form>
            </div>
        );
    }
}

// export default AddPost;

export default (props) => {
    const navigator = useNavigate();
    return <AddPost {...props} navigate={navigator}></AddPost>
};