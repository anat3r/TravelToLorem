class RootVars{
    static root = document.querySelector(':root')
    static getVar(value){
        let rootS = getComputedStyle(this.root);
        return rootS.getPropertyValue('--' + value);
    }
    static logDesignation(name,value){
        console.log(`${name}(${value}): ${this.designations[name]}`);
    }
    static changeVar(name,value,designation){
        this.designations[name] = designation;
        this.root.style.setProperty('--'+name,value);
        this.logDesignation(name,value);
    }
    static designations = {
    }
}
