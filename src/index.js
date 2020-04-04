import marked from 'marked'
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}` + '</a>';
};
const placeholder=`# Welcome to my markdown previewer
## Sub header

## Link
This is [link to Markdown docs](https://daringfireball.net/projects/markdown/syntax#link).

## Inline code
Use the \`printf()\` function.

## Code block
Here's some example code:

    return shell_exec("echo $input | $markdown_script");

## List item
This is an unodered list:
+ item 1
* item 2
- item 3
 - item 3.1
   - item 3.1.1

This is an ordered list:
1. One
2. Two
3. Three

## Blockquote
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

## Image
![React Logo w/ Text](https://goo.gl/Umyytc) 

## Bolded text
**Bold text**`;
function Editor(props){
    return <textarea id="editor" type="text" onChange={props.onChange} value={props.markdown}/>;
}
function Preview(props){
    return <div  id="preview" dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />;
}
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            markdown:placeholder
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({markdown:event.target.value});
    }
    render(){
        return (
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm-6">
            <Editor markdown={this.state.markdown}
        onChange={this.handleChange}/>
        </div>
        <div className="col-sm-6">
            <Preview markdown={this.state.markdown}/>
        </div>
        </div>
        </div>);
    }
}
ReactDOM.render(<App/>,document.getElementById("root"));