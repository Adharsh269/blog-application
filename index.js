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
function addBlog(title,description){
    blog.push({title,description});
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
    const h=req.body.t;
    const c=req.body.b;
    if(!h || !c){
        return res.status(400).send("something is empty.")
    }
    addBlog(h,c);
    console.log(blog);
    res.redirect("/");
})

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
