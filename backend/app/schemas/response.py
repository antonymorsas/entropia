from typing import Generic, TypeVar, Optional
from pydantic.generics import GenericModel

T = TypeVar("T")

class Response(GenericModel, Generic[T]):
    message: str
    data: Optional[T] = None
