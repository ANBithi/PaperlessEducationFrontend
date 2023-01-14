import { REACTION_LIST } from "../Components/Reactions/reactionList"

export const findReactionTypes = (allReactions) =>
{
    let foundReactions = [];
   REACTION_LIST.forEach((target)=>{
    let reactions = allReactions.filter(x=> x.iconId === target.id);
    if(reactions.length === 0){
        return;
    }
    foundReactions.push({
        view : target,
        data: reactions,
        count: reactions.length
    })
   })
   return foundReactions.sort((firstItem, secondItem) => secondItem.count - firstItem.count);;
}