

class ToDo {
    constructor(id, name = '') {
        this.name = name
        this.id = id
        this.isCompleted = false
        this.completionDate = '2020-10-10'
    }

    toJson() {
        return {
            'name': this.name,
            'id': this.id,
            'isCompleted': this.isCompleted,
            'completionDate': this.completionDate
        }
    }
}

module.exports = ToDo