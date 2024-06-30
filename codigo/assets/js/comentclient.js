arrayfeedback=[{id:0,nome: "Beltrano da silva", Cidade: "belo horizonte", Comentario: "asdasd"},
{id:1,nome: "Beltrano da silva", Cidade: "belo horizonte", Comentario: "asdasdasd"},
{id:2,nome: "Beltrano da silva", Cidade: "belo horizonte", Comentario: "asdasdasd"}]

contador=3
onedit=-1

function feedback(){
        
var manipular= arrayfeedback.map(ajustar)
console.log(manipular)
document.getElementById("Feedback").innerHTML=manipular.join("")

}

function ajustar(item){

var retorno= ""
if (item.id<3){
retorno="<div class=\"card\" ><p>"+item.nome+"</p>"+"<p>"+item.Cidade+"</p>"+"<p>"+item.Comentario+"</p></div>" 
}else{
    retorno="<div class=\"card\" ><p>"+item.nome+"</p>"+"<p>"+item.Cidade+"</p>"+"<p>"+item.Comentario+"</p><button class=\"deletareditar\" onclick=deletecomment("+item.id+")>excluir</button><button class=\"deletareditar\"  onclick=Showeditcomment("+item.id+")>editar</button></div>" 
}
 return retorno

}

window.onload = feedback;



function showCommentForm() {
    document.getElementById("commentFormContainer").style.display = "block";
}

function addComment(event) {
    event.preventDefault(); 

    var nome = document.getElementById("nome").value;
    var cidade = document.getElementById("cidade").value;
    var comentario = document.getElementById("comentario").value;

    var newFeedback = {id:contador, nome: nome, Cidade: cidade, Comentario: comentario};
    contador++
    arrayfeedback.push(newFeedback) 
    feedback()
    

    document.getElementById("commentForm").reset();

    document.getElementById("commentFormContainer").style.display = "none";
}

function deletecomment(id){
    var arraylocal=arrayfeedback.filter(item => item.id!=id)
    arrayfeedback=arraylocal
    feedback()

}

function Showeditcomment(id){
    onedit=id
    document.getElementById("editformcontainer").style.display = "block";

}

function editcomment(event){
    event.preventDefault(); 

var nome = document.getElementById("nomeedit").value;
var cidade = document.getElementById("cidadeedit").value;
var comentario = document.getElementById("comentarioedit").value;

var newFeedback = {id:onedit, nome: nome, Cidade: cidade, Comentario: comentario};
var arraylocal=arrayfeedback.map(item => {

    if (item.id==onedit){

        return newFeedback 
    }else{
        return item
    }
    
})
arrayfeedback=arraylocal
feedback()
document.getElementById("editcommentForm").reset();

document.getElementById("editformcontainer").style.display = "none";
onedit=-1
}