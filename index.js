import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

    const blog = [
    ];
function addBlog(id,title,description){
    blog.push({id,title,description});
}

app.get("/" ,(req,res) => {
    res.render("index.ejs",{
        blogs:blog
    });
});
app.get("/add",(req,res)=>{
    res.render("add.ejs");
});
app.post("/add",(req,res)=>{
    const id=req.body.blodId;
    const h=req.body.t;
    const c=req.body.b;
    if(!h || !c){
        return res.status(400).send("something is empty.")
    }
    addBlog(id,h,c);
    console.log(blog);
    res.redirect("/");
})
app.get("/blogpage/:id",(req,res) => {
    const idNum = req.params.id;
    const singleBlog = blog.find((b)=>b.id===idNum);
    if(!singleBlog){
        return res.status(404).send('Blog not found');
    }
    res.render("blogpage.ejs",{blog:singleBlog});
});

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Something went wrong");
});

app.listen(port, ()=>{
    console.log("Listening on port",port);
});

function removeBlog(){
    blog.pop();
}
