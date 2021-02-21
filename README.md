# Market API
## Layered Approach

As we know there are many approaches for write clean code, for instance: clean architecture, hexagonal architecture, event-drive architecture and so on. However, in this case we are going to take a layer approach. This would, therefore, be a good place to implement the renowned **separation of concerns** programming principle (This).

- _**Controller**_ : This layer is where API routes are defined. (Here are defined only and only API Routes).
- _**Service Layer**_: Here is where our business logic lives It contains a bunch of classes and methods that take up singular responsibility and are reusable (and also follow other S.O.L.I.D programming principles).
- _**Data Access Layer**_ : This layer can take up the responsibility of talking to database.

These aspects can be handle by programing using three layers as below.

<img width="568" alt="layared" src="https://user-images.githubusercontent.com/20213215/108635085-d24f2d80-7442-11eb-8da8-9acbeb4ee62e.png">


## Folder Structured.
After describe our approach, we are going to modularize our project 
into three separate layers. This provides clarity about what responsibility/functionality is managed.
Below show you, our effective project structure.

```
node_modules
src
└── app.js  -- app entry point
└── /api    
        └── /Controllers
        └── /Validators
        └── /Middlewares
└── /config    -- settings .env varibles
└── /Services  -- business logic
└── /models    -- database models
└── /scripts   -- miscellaneous scripts
        └── /utils
└── /subscribers  -- async event handlers
└── /test  -- test suites

```

## Technologies
- Vanilla Javascript
- Node.js 14.15.5 LTS
- Express 
- Mailtrap to test emails
- Sparkpost to send emails
- AWS S3 for save images
- MongoDB with mongo Atlas to save user information
- PostgreSQL fot save transactional information. 
- Heroku to deploy project
- Firebase to send notifications

Infrastructure in our project.
   
<img width="772" alt="arcitecture" src="https://user-images.githubusercontent.com/20213215/108635121-20fcc780-7443-11eb-9eec-96b66b1af93e.png">

## Environment setup

coming soon !




