export const ACTION_CATS = 'action_cats';


export function catsActionCreator(cats) {
  return {
    type: ACTION_CATS,
    cats
  }
}