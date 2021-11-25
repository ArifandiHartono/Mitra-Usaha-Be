# fenix-animal

fenix Back End

## member

> register

```bash
method:POST
{{base_url}}/v1/member/register
```

> login

```bash
method:POST
{{base_url}}/v1/member/login
```

> confirmation

```bash
method:PUT
{{base_url}}/v1/member/confirmation
```

> show profile

```bash
method:GET
{{base_url}}/v1/member/profile
```

> update profile

```bash
method:PUT
{{base_url}}/v1/member/profile
```

> update profile by admin

```bash
method:PUT
{{base_url}}/v1/admin/member/:id_member
```

> delete profile by admin

```bash
method:DELETE
{{base_url}}/v1/admin/member/:id_member
```

## petshop

> register

```bash
method:POST
{{base_url}}/v1/petshop/register
```

> login

```bash
method:POST
{{base_url}}/v1/petshop/login
```

> get all

```bash
method:GET
{{base_url}}/v1/petshop/getall
```

> get own

```bash
method:GET
{{base_url}}/v1/petshop
```

> update profile

```bash
method:PUT
{{base_url}}/v1/petshop
```

> delete profile by admin

```bash
method:DELETE
{{base_url}}/v1/admin/petshop/:id
```

## veterenier

> register

```bash
method:POST
{{base_url}}/v1/vet/register
```

> login

```bash
method:POST
{{base_url}}/v1/vet/login
```

> confirm email

```bash
method:PUT
{{base_url}}/v1/vet/confirmation
```

> get own

```bash
method:GET
{{base_url}}/v1/vet/profile
```

> update profile

```bash
method:PUT
{{base_url}}/v1/vet/profile
```

> update profile via admin

```bash
method:PUT
{{base_url}}/v1/admin/vet/:idveterenier
```

> delete profile by admin

```bash
method:DELETE
{{base_url}}/v1/admin/vet/:idveterenier
```

## appointment

> create

```bash
method:POST
{{base_url}}/v1/appointment
```

> get by id member

```bash
method:GET
{{base_url}}/v1/appointment
```

> get by id pet

```bash
method:GET
{{base_url}}/v1/appointment/pet/:idPet
```

> get by id petshop

```bash
method:GET
{{base_url}}/v1/appointment/petshop/:idPetshop
```

> get by id service

```bash
method:GET
{{base_url}}/v1/appointment/service/:idService
```

> update appointment

```bash
method:PUT
{{base_url}}/v1/appointment/:id
```

> delete appointment by admin

```bash
method:DELETE
{{base_url}}/v1/admin/appointment/:id
```

## pet

> create

```bash
method:POST
{{base_url}}/v1/pet
```

> get all

```bash
method:GET
{{base_url}}/v1/pet/getall
```

> get by id pemilik

```bash
method:GET
{{base_url}}/v1/pet/getbyidpemilik/:id
```

> get by id pet

```bash
method:GET
{{base_url}}/v1/pet/:id
```

> update pet

```bash
method:PUT
{{base_url}}/v1/pet/update/:id
```

> delete pet

```bash
method:DELETE
{{base_url}}/v1/pet/delete/:id
```

## petshop service

> create

```bash
method:POST
{{base_url}}/v1/petshop/service
```

> get all

```bash
method:GET
{{base_url}}/v1/petshop/service/getall
```

> get by id petshop

```bash
method:GET
{{base_url}}/v1/petshop/service/getbyidpetshop
```

> get by id

```bash
method:GET
{{base_url}}/v1/petshop/service/:id
```

> update petshop service

```bash
method:PUT
{{base_url}}/v1/petshop/service/update/:id
```

> delete petshop service

```bash
method:DELETE
{{base_url}}/v1/petshop/service/delete/:id
```
