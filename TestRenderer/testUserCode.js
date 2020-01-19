{
    getNextMove:()=>{   
        return {x:1,y:0,goInvisible:false}
   }
}




{
    getAllMoves: (game,bot) =>{
      bot.move({x:0,y:1,goInvisible:false})
      bot.move({x:0,y:2,goInvisible:false})
    }
}

{
    getAllMoves: (game,messenger) =>{
        messenger.move({x:0,y:1,goInvisible:false})
        messenger.move({x:0,y:2,goInvisible:false})
    }
}




{
    getAllMoves: (game,messenger) =>{
        for(let i = 0;i<10;++i){
            messenger.move({x:0,y:1,goInvisible:false})
        }
    }
}