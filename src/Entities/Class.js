class Class {
    constructor(name, active, filter) {
        this.name = name;
        this.active = active;
        this.filter = filter;
    }

    activate() {
        this.active = true;
    }

    disactivate() {
        this.active = false;
    }
}

export default Class;