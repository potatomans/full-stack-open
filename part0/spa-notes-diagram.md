sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{content: "hello world!!", date: "2023-07-13T11:17:51.371Z"}, ... ]
    deactivate server