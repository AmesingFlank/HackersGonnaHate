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