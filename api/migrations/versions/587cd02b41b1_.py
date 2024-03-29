"""empty message

Revision ID: 587cd02b41b1
Revises: 04fd4a03d194
Create Date: 2022-05-24 08:39:03.922066

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '587cd02b41b1'
down_revision = '04fd4a03d194'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('password_hash',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('password_hash',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###
