Naked Password
==============

Visualize password strength with a stripping man or women.

![Screenshot](http://thezee.hu/nakedpassword/preview.png)

How to use
----------

All you need to do is to attach *nakedPassword()* to a password filed.

```javascript
$$("input[type=password]").nakedPassword();
```

It can handle single, or a collection of elements.

Options
-------

`path` : `String` <= `"images/"`

Path to the images.

`sex` : `String` <= `"female"`

Change image gender.

An image with this name should exists under the `path`.

`resize` : `Boolean` <= `true`

Resize the image to the height of the input field.

`imgClass` : `String` <= `"nakedPasswdImage"`

Class on the image.

`imgSize` : `Object` <= `{width: 30, height: 28}`

Size of an image on the sprite.


Original idea
-------------

Original idea and [Jquery plugin](http://www.nakedpassword.com/) by [Platform45](http://www.platform45.com/)