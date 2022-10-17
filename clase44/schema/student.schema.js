import graphql from "graphql"

const { buildSchema } = graphql

const schemaStudent = buildSchema(`

    type Student {
        id: ID!
        name: String,
        age: Int
    }

    input StudentInput {
        name: String,
        age: Int
    }

    type Query {
        getStudent(id: ID!): Student,
        getStudents(field: String, value: String):
    }

    type Mutation {
        createStudent(data: StudentInput): Student,
        updateStudent(id: ID!, data: StudentInput): 
        deleteStudent(id: ID!): Student,
    }


`)

export default schemaStudent
