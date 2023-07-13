const { Octokit } = require('@octokit/rest')
const express = require('express')
require('dotenv').config()

const app = express()
const token = process.env.github_token
const githubOrg = process.env.github_org
const githubUser = process.env.github_username
const port = process.env.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const octokit = new Octokit({
    auth: token
})

async function getIssues() {
    await octokit.request('GET /orgs/{org}/repos', {
        org: githubOrg,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }).then(res => {
        console.log(res)
    })
  }

getIssues()

app.post('/webhook/rectrack', (req,res) => {
    const data = req.body
    console.log(data)
    res.send('Received.')
})

app.listen(port, (err) => {
    if(err) console.log(er)
    console.log(`Server is listening on http://localhost:${port}`)
})