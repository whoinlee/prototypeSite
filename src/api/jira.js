const JIRA_URL = "https://146a3axml6.execute-api.us-west-2.amazonaws.com/dev/jira/";
export async function createPrototypeRequest(summary, description, name) {
    const BODY = {
        "fields": {
            "project":
            {
               "key": "DTECH"
            },
            "summary": `[Prototype Request]: ${summary}`,
            "description": `${description} - Submitted by: ${name}`,
            "issuetype": {
               "name": "Design Tech Story"
            },
            "customfield_11322": "DTECH-250"
        }
    }

    return await fetch(`${JIRA_URL}create-bug`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(BODY)
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
    })
}

export async function searchUser (userName) {
    const BODY = {
        "username": userName
    }

    return await fetch(`${JIRA_URL}search-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(BODY)
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.log(error)
    })
}