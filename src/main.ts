import { Clerk } from '@clerk/clerk-js'
import './style.css'

async function main() {
  const clerk = new Clerk("pk_test_YWRhcHRlZC1mb2FsLTQyLmNsZXJrLmFjY291bnRzLmRldiQ")
  await clerk.load()

  if (!clerk.user || !clerk.session) {
    window.location.href = "/login"
  } else {
    const token = await clerk.session.getToken()

    async function fetchData(button: HTMLButtonElement) {
      button.disabled = true
      button.textContent = "Fetching..."
      const response = await fetch("/hello", {
        method: "POST",
        body: JSON.stringify({
        }),
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const el = document.createElement("p")
      el.textContent = await response.text()
      document.getElementById("app")!.appendChild(el)
      button.disabled = false
      button.textContent = "Fetch Data"
    }

    const app = document.getElementById("app")! as HTMLDivElement
    const hello = document.createElement("h1")
    hello.textContent = `Hello ${clerk.user.fullName}`
    app.appendChild(hello)

    const button = document.createElement("button")
    button.textContent = "Fetch Data"
    button.onclick = () => fetchData(button)
    app.appendChild(button)
  }
}

main().catch(console.error)