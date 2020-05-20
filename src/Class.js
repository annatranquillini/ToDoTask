class Class {
    constructor(name, active, func) {
        this.name = name;
        this.active = active;
        this.func = func;
    }

    activate() {
        this.active = true;
    }

    disactivate() {
        this.active = false;
    }
}

export default Class;