export default class Likes {
    
    constructor() {
        this.likes = [];
    }
    
    addLike(id, title, author, img) {
        
        this.readStorage();
        
        const like = { id, title, author, img };        
        this.likes.push(like);
        
        //Persist the data in local storage
        this.persistData();
        
        return like;
    }
    
    deleteLike(id) {
        
        this.readStorage();
        
         const index = this.likes.findIndex(el => el.id === id);
         this.likes.splice(index, 1);
        
        //Persist the data in local storage
        this.persistData();
    }
    
    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    
    getNumLikes() {
        return this.likes.length;
    }
    
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
    
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        // restore our likes from the localStorage
        if (storage) this.likes = storage;
    }
    
}

