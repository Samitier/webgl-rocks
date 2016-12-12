import Stats from "stats.js"

class RenderStats {
    constructor() {
        this.stats = new Stats()
        this.stats.showPanel( 0 ) 
        document.body.appendChild( this.stats.dom )
    }
    begin() { 
        this.stats.begin()
    }
    end() { 
        this.stats.end()
    }
}

export {RenderStats}
