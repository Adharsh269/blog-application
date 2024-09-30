import express from "express";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

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
    console.log(h);
    console.log(c);
    if(!h || !c){
        return res.status(400).send("something is empty.")
    }
    blog.push({title:h,description:c});
    res.redirect("/");
})

app.listen(port, ()=>{
    console.log("Listening on port",port);
});

const blog={
    title:[

    ],
    description:[

    ]
};