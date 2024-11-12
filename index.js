import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

    const blog = [
        {
            id:1,
            title:"My first Blog",
            description:"It's okat to not to be okay."
        },
    ];


app.get("/" ,(req,res) => {
    res.render("index.ejs",{
        blogs:blog
    });
});
app.get("/add",(req,res)=>{
    res.render("add.ejs");
});
app.post("/add",(req,res)=>{
    const newblog = {
        id:blog.length+1,
        title:req.body.t,
        description:req.body.b,
    }
    blog.push(newblog)
    console.log(blog);
    res.redirect("/");
})
app.get("/blogpage/:id",(req,res) => {
    const idNum = parseInt(req.params.id);
    const singleBlog = blog.find((b)=>b.id === idNum);
    if(!singleBlog){
        return res.status(404).send('Blog not found');
    }
    res.render("blogpage.ejs",{blog:singleBlog});
    // res.json(singleBlog);
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
