# MapsApp

**No** usar directamente en **AngularCLI** (a menos que estén **creadas las variables de entorno**), ya que las variables de entorno se crean basados en el **.env**

## Pasos:

1. Clonar el .env.template y renombrarlo a .env

2. Llenar las variables de entorno acorde

3. Crear Angular Envs (opcional)

    ```npm run envs```

4. Para development ejecutar:

    ```npm run start```

5. Para producción ejecutar:

      ```npm run build```

## Cambios Realizados para usar el modelo standalone

1. se agrego el modulo *alone* para implementar componentes standalone, donde se crearon los siguientes archivos: 
    - alone/pages/alonePage --standalone
    - alone/components/counterAlone --standalone

2. Se reestructuro  el componente maps/components/side-menu para volverlo un componente standalone
en:
    - alone/components/side-menu

3. Se actualizaron las rutas para que siguiera funcionando de la misma manera

  

