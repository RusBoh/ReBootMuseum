from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.text import slugify
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    slug = models.SlugField(max_length=80, unique=True)
    title_cs = models.CharField(max_length=120)
    title_en = models.CharField(max_length=120)
    description_cs = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title_en"]

    def __str__(self):
        return self.title_en


class Room(TimeStampedModel):
    slug = models.SlugField(max_length=80, unique=True)
    title_cs = models.CharField(max_length=120)
    title_en = models.CharField(max_length=120)
    subtitle_cs = models.CharField(max_length=180, blank=True)
    subtitle_en = models.CharField(max_length=180, blank=True)
    description_cs = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    atmosphere_cs = models.TextField(blank=True)
    atmosphere_en = models.TextField(blank=True)
    theme_key = models.CharField(max_length=80, blank=True)
    ambient_key = models.CharField(max_length=80, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title_en"]

    def __str__(self):
        return self.title_en


class Exhibit(TimeStampedModel):
    room = models.ForeignKey(Room, on_delete=models.PROTECT, related_name="exhibits")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="exhibits")

    slug = models.SlugField(max_length=120, unique=True)

    name_cs = models.CharField(max_length=160)
    name_en = models.CharField(max_length=160)

    year_or_era_cs = models.CharField(max_length=160, blank=True)
    year_or_era_en = models.CharField(max_length=160, blank=True)

    description_cs = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    caption_cs = models.TextField(blank=True)
    caption_en = models.TextField(blank=True)

    sound_key = models.CharField(max_length=80, blank=True)
    visual_key = models.CharField(max_length=80, help_text="Např. old-telephone")
    icon_name = models.CharField(
        max_length=120,
        blank=True,
        help_text="Název ikonky bez přípony, např. old-telephone",
    )

    image_name = models.CharField(
        max_length=120,
        blank=True,
        help_text="Název obrázku bez přípony, např. old-telephone",
    )
    image_alt_cs = models.CharField(max_length=180, blank=True)
    image_alt_en = models.CharField(max_length=180, blank=True)

    position_x = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=50,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    position_y = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=50,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    scale = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default=1.00,
        validators=[MinValueValidator(0.10), MaxValueValidator(5.00)],
    )
    rotation = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(-180), MaxValueValidator(180)],
    )

    order = models.PositiveIntegerField(default=0)
    highlight_priority = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["room__order", "order", "-highlight_priority", "name_en"]
        indexes = [
            models.Index(fields=["room", "order"]),
            models.Index(fields=["slug"]),
            models.Index(fields=["is_active"]),
            models.Index(fields=["icon_name"]),
            models.Index(fields=["image_name"]),
        ]

    def save(self, *args, **kwargs):
        if not self.icon_name:
            self.icon_name = slugify(self.slug)

        if not self.image_name:
            self.image_name = slugify(self.slug)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_en

